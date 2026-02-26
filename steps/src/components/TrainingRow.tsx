import type { Training } from '../types/Training';

type Props = {
  training: Training;
  onEdit: (training: Training) => void;
  onDelete: (date: string) => void;
};

export default function TrainingRow({ training, onEdit, onDelete }: Props) {
  return (
    <div className="table-row">
      <div className="col-date">{training.date}</div>
      <div className="col-distance">{training.distance.toFixed(1)}</div>
      <div className="col-actions">
        <button className="action-btn edit-btn" onClick={() => onEdit(training)} title="Редактировать">
          ✎
        </button>
        <button className="action-btn delete-btn" onClick={() => onDelete(training.date)} title="Удалить">
          ✘
        </button>
      </div>
    </div>
  );
}