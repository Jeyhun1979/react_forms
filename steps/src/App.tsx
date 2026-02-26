import { useState } from 'react';
import type { Training } from './types/Training';
import TrainingForm from './components/TrainingForm';
import TrainingList from './components/TrainingList';
import './App.css';

function parseDate(date: string): Date {
  const [day, month, year] = date.split('.');
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export default function App() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);

  const handleSave = (newTraining: Training) => {
    setTrainings(prev => {
      let filtered = prev;
      if (editingTraining) {
        filtered = prev.filter(t => t.date !== editingTraining.date);
      }

      const existing = filtered.find(t => t.date === newTraining.date);

      let updated: Training[];
      if (existing) {
        updated = filtered.map(t =>
          t.date === newTraining.date
            ? { ...t, distance: t.distance + newTraining.distance }
            : t
        );
      } else {
        updated = [...filtered, newTraining];
      }

      updated.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

      return updated;
    });

    setEditingTraining(null);
  };

  const handleEdit = (training: Training) => {
    setEditingTraining(training);
  };

  const handleCancelEdit = () => {
    setEditingTraining(null);
  };

  const handleDelete = (date: string) => {
    setTrainings(prev => prev.filter(t => t.date !== date));
    if (editingTraining && editingTraining.date === date) {
      setEditingTraining(null);
    }
  };

  return (
    <div className="container">
      <TrainingForm
        key={editingTraining ? editingTraining.date : 'new'}
        onSave={handleSave}
        editingTraining={editingTraining}
        onCancelEdit={handleCancelEdit}
      />
      <TrainingList
        trainings={trainings}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}