import { useCallback, useEffect, useRef, useState } from "react";

interface UseAutoSaveOptions<T> {
  delayMs: number;
  enabled: boolean;
  onSave: (value: T) => void;
}

interface UseAutoSaveResult {
  savedAt: Date | null;
  reset: () => void;
}

export function useAutoSave<T>(value: T, options: UseAutoSaveOptions<T>): UseAutoSaveResult {
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const onSaveRef = useRef(options.onSave);

  useEffect(() => {
    onSaveRef.current = options.onSave;
  }, [options.onSave]);

  useEffect(() => {
    if (!options.enabled) return;
    const id = setTimeout(() => {
      onSaveRef.current(value);
      setSavedAt(new Date());
    }, options.delayMs);
    return () => clearTimeout(id);
  }, [value, options.enabled, options.delayMs]);

  const reset = useCallback((): void => setSavedAt(null), []);

  return { savedAt, reset };
}
