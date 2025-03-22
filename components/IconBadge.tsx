export function IconBadge({ icon, text }) {
  return (
    <div className="flex items-center place-content-center border rounded border-black">
      {icon}
      <span className="border-l-2 border-black px-3">{text}</span>
    </div>
  );
}
export default IconBadge;
