import { useState, useRef } from "react";
import { withIdentity } from "../components/Authenticator";
import { Camera } from "react-camera-pro";
import { useUploader } from "@w3ui/react-uploader";
import { useUploadsList } from "@w3ui/react-uploads-list";
import ImageListItem from "../components/ImageListItem";

function dataURLtoFile(dataurl) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const blob = new Blob([u8arr], { type: mime });
  return new File([blob], "camera-image");
}

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
      const theFile = dataURLtoFile(imgdata);
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
