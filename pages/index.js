import { useState, useRef } from "react";
import { withIdentity } from "../components/Authenticator";
import { Camera } from "react-camera-pro";
import { useUploader } from "@w3ui/react-uploader";
import { useUploadsList } from "@w3ui/react-uploads-list";
import ImageListItem from "../components/ImageListItem";

export function Home() {
  const camera = useRef(null);
  const [, uploader] = useUploader();
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  const {
    loading,
    error: listError,
    data: listData,
    reload: listReload,
  } = useUploadsList();
  const printListData = (listData && listData.results) || [];

  const printStatus = status === "done" && error ? error.message : status;

  const takePhoto = async (e) => {
    e.preventDefault();
    const imgdata = camera.current.takePhoto();
    try {
      // Build a DAG from the file data to obtain the root CID.
      setStatus("encoding");
      // use fetch to transform data URL -> blob -> file
      const theFile = await fetch(imgdata).then((it) => it.blob());
      setStatus("uploading");
      const cid = await uploader.uploadFile(theFile);
      setImages([{ cid: cid, data: imgdata }, ...images]);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setStatus("done");
    }
  };

  return (
    <div>
      <p>
        <button style={{ cursor: "pointer" }} onClick={takePhoto}>
          Take photo
        </button>{" "}
        {printStatus}
      </p>
      <div className="relative">
        <div style={{ width: 300, height: 300 }}>
          <Camera ref={camera} />
        </div>
      </div>
      <ul className="list">
        {images.map(({ cid, data }) => (
          <ImageListItem key={cid} cid={cid} data={data} />
        ))}
        {printListData.map(({ dataCid: cid }) => (
          <ImageListItem key={cid} cid={cid} />
        ))}
      </ul>
    </div>
  );
}

export default withIdentity(Home);
