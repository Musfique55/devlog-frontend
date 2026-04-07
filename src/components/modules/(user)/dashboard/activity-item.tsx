

interface ActivityItemProps {
  title: string;
  description: string;
  timestamp: string;
  tags: Array<{ label: string; color?: 'primary' | 'default' }>;
  borderColor?: string;
}

export function ActivityItem({ title, description, timestamp, tags, borderColor = 'border-indigo-500' }: ActivityItemProps) {
  return (
    <div className="bg-zinc-900/60 hover:bg-zinc-900/80 transition-all p-6 rounded-xl flex gap-6 items-start border border-zinc-800/50">
      {/* Left Border Indicator */}
      <div className={`w-1 h-24 rounded-full flex-shrink-0 ${borderColor}`} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title & Time */}
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-zinc-100 truncate">{title}</h4>
          <span className="text-xs font-medium text-zinc-500 flex-shrink-0">{timestamp}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 mb-4 line-clamp-2 leading-relaxed">{description}</p>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-0.5 text-xs font-bold rounded uppercase border ${
                tag.color === 'primary'
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-700'
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
