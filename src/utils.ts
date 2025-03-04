export const debounce = (func: { apply: (arg0: undefined, arg1: any) => void; }, timeout = 300)=>{
    let timer: string | number | NodeJS.Timeout | undefined;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }