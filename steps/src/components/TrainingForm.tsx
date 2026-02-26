import { useState } from 'react';
import type { Training } from '../types/Training';

type Props = {
  onSave: (data: Training) => void;
  editingTraining: Training | null;
  onCancelEdit: () => void;
};

export default function TrainingForm({ onSave, editingTraining, onCancelEdit }: Props) {
  const [date, setDate] = useState(editingTraining ? editingTraining.date : '');
  const [distance, setDistance] = useState(editingTraining ? String(editingTraining.distance) : '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
      setError('Дата должна быть в формате ДД.ММ.ГГГГ');
      return;
    }
    if (Number(distance) <= 0 || isNaN(Number(distance))) {
      setError('Километры должны быть положительным числом');
      return;
    }

    setError(null);
    onSave({ date, distance: Number(distance) });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit} key={editingTraining ? editingTraining.date : 'new'}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
          <input
            id="date"
            type="text"
            value={date}
            onChange={e => setDate(e.currentTarget.value)}
            placeholder="20.07.2019"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="distance">Пройдено км</label>
          <input
            id="distance"
            type="number"
            step="0.1"
            min="0"
            value={distance}
            onChange={e => setDistance(e.currentTarget.value)}
            placeholder="5.7"
            required
          />
        </div>
        <button className="submit-btn" type="submit">OK</button>
        {editingTraining && (
          <button
            type="button"
            className="submit-btn"
            style={{ backgroundColor: '#ccc', marginLeft: '10px' }}
            onClick={onCancelEdit}
          >
            Отмена
          </button>
        )}
      </div>
      {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
    </form>
  );
}