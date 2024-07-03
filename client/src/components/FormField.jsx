const FormField = () => {
  return (
    <div className="w-60 bg-red-500 round-md">
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />
    </div>
  );
}

export default FormField;