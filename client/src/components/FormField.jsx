const FormField = ( {LabelName, type, name, placeholder, value, handleChange, isSupriseMe, handleGenerating} ) => {
  return (
   <div>
    <div className="flex items-center gap-2 mb-2">
      <label htmlFor={name}
         className="block text-sm font-medium text-gray-900">
        {LabelName}
      </label>
      {isSupriseMe && (
        <button
          type='button'
          onClick={handleGenerating}
          className='bg-[#ECECF1] text-xs text-black px-3 py-1 rounded-[5px] font-semibold'>
          Generate
        </button>
      )}
    </div>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] w-full px-3 py-2 mt-1 outline-none"
    />
   </div>
  );
}

export default FormField;