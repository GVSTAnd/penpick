export interface StorageImplementation {
    getValue: (key: string) => string;
    setValue: (key: string, value: string) => void;
}
