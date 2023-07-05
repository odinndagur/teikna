export function spliceNoMutate(myArray: any[], indexToRemove: number) {
    return myArray
        .slice(0, indexToRemove)
        .concat(myArray.slice(indexToRemove + 1))
}
