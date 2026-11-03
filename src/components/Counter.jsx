import useCountUp from '../hooks/useCountUp';

export default function Counter({ className, target, suffix = '', run }) {
  const value = useCountUp(target, run);
  return (
    <div className={className} aria-label={`${target}${suffix}`}>
      {value}
      {suffix}
    </div>
  );
}
