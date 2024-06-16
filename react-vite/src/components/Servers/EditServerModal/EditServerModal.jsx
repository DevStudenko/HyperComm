import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { updateServerThunk } from "../../../redux/servers";
import styles from "./EditServerModal.module.css";


const EditServerModal = () => {
  const server = useSelector((state) => state.server.current);
  const dispatch = useDispatch();
  const [serverName, setServerName] = useState(server.name);
  const [errors, setErrors] = useState("");
  const [file, setFile] = useState(server.image_url);
  const { closeModal } = useModal();
  console.log(server)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (errors.length) {
      setErrors(errors);
    }
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    try {
      if (!serverName.trim().length) {
        return setErrors({ errors: "Server Name is required" });
      }
      if (!file) {
        return setErrors({ errors: "Please select a file." });
      }
      const allowedExtensions = ["png", "jpg", "jpeg", "gif"];
      const fileName = file.name;
      const imgExt = fileName.split('.').pop();

      const checkExt = () => {
        return allowedExtensions.includes(imgExt)
      }
      if (!checkExt()) {
        return setErrors({ errors: "File extension not supported." })
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("serverName", serverName);

      dispatch(updateServerThunk(server.id, formData));
      closeModal();

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.title}>Edit Server</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.error}>{errors && errors.errors}</p>
        <input
          type="text"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
          required
        />
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button className={styles.submit} type="submit">
          Update Server
        </button>
      </form>
    </main>
  );
};

export default EditServerModal;
