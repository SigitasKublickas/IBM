type Props = {
  onImageUploaded: (file: FileReaderType) => void;
};
export type FileReaderType = string | ArrayBuffer | null;
export const ImgInput = (props: Props) => {
  return (
    <div className="file-drop-area">
      <span className="fake-btn">Choose files</span>
      <span className="file-msg">or drag and drop files here</span>
      <input
        className="file-input"
        type="file"
        accept="image/png, image/jpeg"
        onChange={(event: any) => {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              props.onImageUploaded(reader.result);
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>
  );
};
