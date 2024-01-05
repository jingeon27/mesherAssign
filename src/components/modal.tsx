export interface modalProps {
  changeState: (e: string) => void;
}
export const Modal = ({ changeState }: modalProps) => {
  console.log('1');
  return (
    <>
      <div>안녕하세요</div>.
    </>
  );
};
