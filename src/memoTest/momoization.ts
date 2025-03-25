// 1️⃣ 피보나치 수열 (기본적인 재귀 최적화)

// 요구 사항:
// 	•	fib(n)을 재귀적으로 구현하되, 메모이제이션을 적용하여 성능을 최적화하세요.
// 	•	fib(40)을 호출해도 빠르게 실행되어야 합니다.

// 추가 조건:
// 	•	Map 또는 객체를 활용하여 이전 값을 저장하세요.
// 	•	useMemo를 사용할 필요 없이 순수 함수로 작성하세요

export const fib = (n: number, memo: Record<number, number> = {}): number => {
  // 구현하세요
  if(n in memo) return memo[n];
  if(n <= 1) return n;
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
  return memo[n]
};

const factorial = (n: number, memo: Record<number, number> = {}): number => {
  if (n in memo) return memo[n];
  if(n<=1) return 1;
  memo[n] = n * factorial(n - 1, memo)
  return memo[n]
}

const memoizedFetch = ((): (url: string) => Promise<any> => {
    const cache = new Map();
    return async (url:string) => {
        if(cache.has(url)) return cache.get(url);
        const response = await fetch(url);
        if(!response?.ok) throw new Error('네트워크 오류');
        const data = await response.json();
        cache.set(url, data);
        return data;
    }
})()

const memoizedSum = ((): (a:number, b:number) => number => {
    const cache = new Map();
    return (a:number, b:number) => {
        const key = `${a},${b}`;
        if(cache.has(key)) return cache.get(key);
        const result = a + b;
        cache.set(key, result);
        return result
    }
})()

const findDeep = (obj: Record<string, any>, key: string, memo: Map<Record<string, any>, any> = new Map()): any => {
    if(memo.has(obj)) return memo.get(obj)
    if(obj.hasOwnProperty(key)) return obj[key]
    for (const k in obj) {
        if(typeof obj[k] === 'object') {
            const result = findDeep(obj[k], key, memo)
            if(result !== undefined) {
                memo.set(obj, result)
                return result
            }
        }
    }
}

const dibounce = (():((func: () => any, delay: number) => void) => {
    let timer: NodeJS.Timeout | null = null;
    return (func: () => any, delay: number) => {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func();
        }, delay)
    }
})()

const throttle = (() => {
    let lastTime = 0;
    return (func: () => any, delay: number) => {
        const now = new Date().getTime();
        if(lastTime === 0 || now - lastTime > delay) {
            func();
            lastTime = now
        }
    }
})()