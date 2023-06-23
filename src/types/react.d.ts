declare namespace React {
  /**
   * Augmented version of `useCallback` that improves type inferrence.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function useCallback<T extends any[], R>(
    callback: (...arg: T) => R,
    deps: DependencyList
  ): (...arg: T) => R;

  /**
   * Augmented version of `forwardRef` that improves generic type support.
   *
   * @see  https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function forwardRef<T, P = Record<string, any>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}
