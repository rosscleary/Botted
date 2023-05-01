import "./Pagetitle.css";

interface titleProps {
  title: string;
  desc: string;
}

const Pagetitle = ({ title }: titleProps) => {
  return (
    <div>
      <h1 className="title">{title}</h1>
    </div>
  );
};

export default Pagetitle;
