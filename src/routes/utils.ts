export const shuffleArray = (array: Array<any>): Array<any> => {
    return array.sort((a: any, b: any) => 0.5 - Math.random());
};

export const capitalizeText = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};
