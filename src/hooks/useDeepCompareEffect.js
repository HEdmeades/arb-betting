import { isEqual, cloneDeep as clone } from "lodash";
import { useEffect, useRef } from "react";

function deepCompareEquals(a, b){
  return isEqual(a, b);
}

function useDeepCompareMemoize(value) {
  const ref = useRef();
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = clone(value);
  }

  return ref.current;
}

function useDeepCompareEffect(callback, dependencies) {
  useEffect(
    callback,
    dependencies.map(useDeepCompareMemoize)
  );
}

export default useDeepCompareEffect;
