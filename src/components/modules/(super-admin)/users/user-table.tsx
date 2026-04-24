"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/hooks/useAuth";
import { getUsers, updateUserStatus } from "@/services/admin.services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Edit2,
  Ban,
  Trash2,
  ArchiveRestore,
  Unlock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";
import { FilterBar } from "./filter-bar";
import UsersSkeleton from "../ui/users-skeleton";
import UsersFallback from "../ui/users-fallback";

interface UserTableResponse {
  success: boolean;
  message: string;
  data: User[] | null;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

function getStatusColor(status: string) {
  switch (status) {
    case "isBlocked : false":
      return "bg-purple-500";
    case "isBlocked : true":
      return "bg-zinc-700";
    case "isDeleted : true":
      return "bg-red-500";
    default:
      return "bg-zinc-700";
  }
}

export function UsersTable({currentPage, currentFilter}: {currentPage : number, currentFilter : string}) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: users,isLoading } = useQuery<UserTableResponse>({
    queryKey: ["admin-users", currentPage, currentFilter],
    queryFn: async () => {
      const res = await getUsers({
        page: currentPage.toString(),
        limit: "3",
        ...(currentFilter === "active" && { isDeleted: "false" }),
        ...(currentFilter === "banned" && { isDeleted: "true" }),
        ...(currentFilter === "inactive" && { isBlocked: "true" })
      });
      return res;
    },
    placeholderData: (previousData) => previousData,
  });

  const handleUserStatusChange = async (
    userId: string,
    action: "block" | "unblock" | "delete" | "restore",
  ) => {
    toast.message(`Are you sure you want to ${action} this user?`, {
      action: {
        label: "Confirm",
        onClick: async () => {
          try {
            let payload = {};
            if (action === "block") {
              payload = { isBlocked: true };
            } else if (action === "unblock") {
              payload = { isBlocked: false };
            } else if (action === "delete") {
              payload = { isDeleted: true };
            } else if (action === "restore") {
              payload = { isDeleted: false };
            }

            const res = await updateUserStatus(userId, payload);
            if (!res.data.success) {
              toast.error(
                res.data.message ||
                  "An error occurred while updating user status.",
              );
            } else {
              toast.success(
                res.data.message || "User status updated successfully.",
              );
              queryClient.invalidateQueries({
                queryKey: ["admin-users"],
              });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            toast.error(
              error.message || "An error occurred while updating user status.",
            );
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const url = new URLSearchParams(searchParams);
      url.set("page", (currentPage - 1).toString());
      router.push(`?${url.toString()}`);
    }
  };

  const handleNext = () => {
    if (users && users.meta && currentPage < users.meta.totalPages) {
      const url = new URLSearchParams(searchParams);
      url.set("page", (currentPage + 1).toString());
      router.push(`?${url.toString()}`);
    }
  };

    const handlePageSelect = (page: number) => {
    const url = new URLSearchParams(searchParams);
    url.set("page", page.toString());
    router.push(`?${url.toString()}`);
  };


  if (isLoading) {
    return (
      <UsersSkeleton />
    );
  }

  // Empty state
  if (users  &&  users.data?.length === 0) {
    return (
      <UsersFallback  />
    );
  }

  return (
    <div>
      <FilterBar />
      {/* User Table */}
      <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800/50">
              <th className="py-5 px-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Identity
              </th>
              <th className="py-5 px-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Email Address
              </th>
              <th className="py-5 px-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Tier & Role
              </th>
              <th className="py-5 px-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Enrollment
              </th>
              <th className="py-5 px-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {users &&
              users.data &&
              users.data.length > 0 &&
              users.data.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-zinc-800/30 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {user.image ? (
                          <Image
                            alt={user.name}
                            className="w-10 h-10 rounded-lg object-cover border border-zinc-700"
                            src={user.image}
                            width={40}
                            height={40}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-zinc-700 border border-zinc-700 flex items-center justify-center text-xs text-zinc-400 font-medium">
                            {user.name.charAt(0)}
                          </div>
                        )}

                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(
                            `isBlocked : ${user.isBlocked}, isDeleted : ${user.isDeleted}`,
                          )} border-2 border-zinc-900 rounded-full`}
                        ></div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-100">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-zinc-500 font-medium">
                          ID: {user.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-zinc-400 font-medium">
                      {user.email}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 ${
                          user?.plan === "PRO"
                            ? "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                            : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                        } text-[10px] font-bold uppercase rounded`}
                      >
                        {user.plan}
                      </span>
                      <span className="text-xs text-zinc-500 font-medium">
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-xs text-zinc-400 font-medium">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      
                      {user.isBlocked ? (
                        <Button
                          onClick={() =>
                            handleUserStatusChange(user.id, "unblock")
                          }
                          variant="ghost"
                          size="sm"
                          className="text-zinc-500 hover:text-purple-400 hover:bg-purple-500/10"
                        >
                          <Unlock className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            handleUserStatusChange(user.id, "block")
                          }
                          variant="ghost"
                          size="sm"
                          className="text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                      )}

                      {user.isDeleted ? (
                        <Button
                          onClick={() =>
                            handleUserStatusChange(user.id, "restore")
                          }
                          variant="ghost"
                          size="sm"
                          className="text-zinc-500 hover:text-green-400 hover:bg-green-500/10"
                        >
                          <ArchiveRestore className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            handleUserStatusChange(user.id, "delete")
                          }
                          variant="ghost"
                          size="sm"
                          className="text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="mt-5 flex items-center justify-between bg-zinc-900 rounded-xl border border-zinc-800 px-6 py-4">
        <div className="text-xs text-zinc-500 font-medium">
          Showing{" "}
          <span className="text-zinc-300 font-semibold">
            {(currentPage - 1) * 3 + 1}
          </span>{" "}
          to{" "}
          <span className="text-zinc-300 font-semibold">
            {Math.min(currentPage * 3, users?.meta?.total || 0)}
          </span>{" "}
          of{" "}
          <span className="text-zinc-300 font-semibold">
            {users?.meta?.total || 0}
          </span>{" "}
          users
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="border-zinc-700 text-zinc-400 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {users?.meta && users.meta.totalPages > 1 ? (
              [...Array(users.meta.totalPages)].map((_, index) => {
               return <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handlePageSelect(index + 1)}
                  className={
                    currentPage === index + 1
                      ? "bg-purple-500 hover:bg-purple-600 text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                  }
                >
                  {index + 1}
                </Button>
})
            ) : (
              <Button
                variant="ghost"
                className="w-8 h-8 bg-purple-500 hover:bg-purple-600 text-white cursor-pointer text-xs font-bold"
              >
                1
              </Button>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === users?.meta?.totalPages}
            className="border-zinc-700 text-zinc-400 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
