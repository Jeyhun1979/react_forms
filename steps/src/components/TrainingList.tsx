import type { Training } from '../types/Training';
import TrainingRow from './TrainingRow';

type Props = {
  trainings: Training[];
  onEdit: (training: Training) => void;
  onDelete: (date: string) => void;
};

export default function TrainingList({ trainings, onEdit, onDelete }: Props) {
  if (trainings.length === 0) {
    return <div className="empty-state">Данные отсутствуют</div>;
  }

  return (
    <div className="data-table">
      <div className="table-header">
        <div className="col-date">Дата (ДД.ММ.ГГГГ)</div>
        <div className="col-distance">Пройдено км</div>
        <div className="col-actions">Действия</div>
      </div>
      <div className="table-body">
        {trainings.map(t => (
          <TrainingRow
            key={t.date}
            training={t}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}