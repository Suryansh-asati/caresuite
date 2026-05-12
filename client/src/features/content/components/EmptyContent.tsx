import React from 'react';
import Button from '../../../shared/ui/Button';

interface EmptyContentAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

interface EmptyContentProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: EmptyContentAction;
  actionNode?: React.ReactNode;
  className?: string;
}

export const EmptyContent: React.FC<EmptyContentProps> = ({
  title,
  description,
  icon,
  action,
  actionNode,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/70 px-6 py-12 text-center ${className}`.trim()}
    >
      {icon && (
        <div className="mb-4 text-3xl text-slate-400" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description && <p className="mt-2 max-w-md text-sm text-slate-600">{description}</p>}
      {actionNode && <div className="mt-6">{actionNode}</div>}
      {!actionNode && action && (
        <div className="mt-6">
          <Button variant={action.variant ?? 'primary'} onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
};
