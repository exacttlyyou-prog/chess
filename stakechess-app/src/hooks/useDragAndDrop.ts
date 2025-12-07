import { useState, useCallback, useRef } from 'react';

interface Position {
  row: number;
  col: number;
}

export function useDragAndDrop() {
  const [draggingFrom, setDraggingFrom] = useState<Position | null>(null);
  const [dragOverSquare, setDragOverSquare] = useState<Position | null>(null);
  const dragImageRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, position: Position) => {
    setDraggingFrom(position);

    // Create a semi-transparent drag image
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', JSON.stringify(position));

      // Set custom drag image if available
      if (dragImageRef.current) {
        const rect = dragImageRef.current.getBoundingClientRect();
        e.dataTransfer.setDragImage(
          dragImageRef.current,
          rect.width / 2,
          rect.height / 2
        );
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, position: Position) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
    setDragOverSquare(position);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverSquare(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, position: Position) => {
    e.preventDefault();
    setDragOverSquare(null);

    if (!draggingFrom) return null;

    const result = {
      from: draggingFrom,
      to: position,
    };

    setDraggingFrom(null);
    return result;
  }, [draggingFrom]);

  const handleDragEnd = useCallback(() => {
    setDraggingFrom(null);
    setDragOverSquare(null);
  }, []);

  const isDragging = useCallback((position: Position) => {
    return draggingFrom?.row === position.row && draggingFrom?.col === position.col;
  }, [draggingFrom]);

  const isDragOver = useCallback((position: Position) => {
    return dragOverSquare?.row === position.row && dragOverSquare?.col === position.col;
  }, [dragOverSquare]);

  return {
    draggingFrom,
    dragOverSquare,
    dragImageRef,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
    isDragging,
    isDragOver,
  };
}
