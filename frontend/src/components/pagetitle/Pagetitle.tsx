import "./Pagetitle.css";

interface titleProps {
  title: string;
  desc: string;
}

const Pagetitle = ({ title, desc }: titleProps) => {
  return (
    <div>
      <h1 className="title">{title}</h1>
      <h2 className="desc">{desc}</h2>
    </div>
  );
};

export default Pagetitle;
