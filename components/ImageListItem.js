export default function ImageListItem({ cid, data }) {
  if (/bagb/.test(`${cid}`)) {
    return <li key={cid}>CAR cid: {cid}</li>;
  }
  const imgUrl = `https://w3s.link/ipfs/${cid}`;
  const imgSrc = data || imgUrl;
  return (
    <li key={cid} className="dib mh2">
      <a href={imgUrl}>
        <img width="200px" alt="camera output" src={imgSrc} />
      </a>
    </li>
  );
}
