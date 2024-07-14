


export const PasswordStrength = (
  {passwordStrength: {force, bgColor, textColor}} : 
  {passwordStrength: {force: string, bgColor: string, textColor: string}}) => {
  return (
    <div
      className="px-5 py-4 rounded-sm"
      style={{ backgroundColor: bgColor ?? '', color: textColor ?? '', borderRadius: 5 }}
    >
      {force ?? ''}
    </div>
  );
};
