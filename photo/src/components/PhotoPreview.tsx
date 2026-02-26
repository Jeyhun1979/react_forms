type Props = {
  src: string;
  onRemove: () => void;
};

export default function PhotoPreview({ src, onRemove }: Props) {
  return (
    <div className="preview-item">
      <img src={src} alt="preview" className="preview-image" />
      <button className="remove-btn" onClick={onRemove} title="Удалить">×</button>
    </div>
  );
}