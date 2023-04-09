export const shuffleArray = (array: Array<any>): Array<any> => {
    return array.sort((a: any, b: any) => 0.5 - Math.random());
};
