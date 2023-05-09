import { FieldProps } from '../../types/chat';

function Field(fieldProps: FieldProps) {
  const { title, placeholder, type, name, onChange } = fieldProps;

  return (
    <div className="content d-flex flex-column mb-4 position-relative" data-aos="fade">
      <span>{title}</span>
      <div className="position-relative">
        <input
          type={type}
          className="form-control effect-5 position-relative"
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
        />
        <span className="focus-border"></span>
      </div>
    </div>
  );
}

export default Field;
