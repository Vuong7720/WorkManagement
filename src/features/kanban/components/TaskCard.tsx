import type { ITask } from '../../../types';

interface TaskCardProps {
    task: ITask;
}

export const TaskCard = ({ task }: TaskCardProps) => {
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <h3 className="font-medium text-gray-900">{task.title}</h3>

            <p className="text-gray-500 text-sm mt-2 line-clamp-2">{task.description}</p>

            <div className="mt-3 flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${task.priority === 'High' ? 'bg-red-50 text-red-700 border border-red-200' :
                        task.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                            'bg-green-50 text-green-700 border border-green-200'
                    }`}>
                    {task.priority}
                </span>

                {task.assignees.length > 0 && (
                    <div className="flex -space-x-2">
                        {task.assignees.map((assignee) => (
                            <img
                                key={assignee.id}
                                src={assignee.avatar}
                                alt={assignee.name}
                                className="w-6 h-6 rounded-full border-2 border-white"
                                title={assignee.name}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};