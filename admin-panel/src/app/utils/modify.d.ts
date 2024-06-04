type Modify<T, R> = Omit<T, keyof R> & R;
// Define Omit.  Can be defined in a utilities package
// type ExcludeFields = Pick<T, Exclude<keyof T, K>>
