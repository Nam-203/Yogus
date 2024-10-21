export interface HomeCardProps {
  className: string;
  img: string;
  title: string;
  description: string;
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}
export interface ModalProps {
    isOpen: boolean;
    onClose:()=> void;
    title: string;
    className?: string;
    children?: React.ReactNode;
    handleClick?: () => void;
    buttonText?: string;
    instantMeeting?: boolean;
    image?: string;
    buttonClassName?: string;
    buttonIcon?: string;
  }
 export interface NHFInputProps {
    name: string;
    label?: string;
    helperText?: string;
    className?: string;
    placeholder: string;
    type?: string;
  }
  export interface User {
    id: string;               // id luôn cần phải có
    name: string | null;       // name có thể là chuỗi hoặc null
    email: string | null;      // email có thể là chuỗi hoặc null
    image: string | null;      // image có thể là chuỗi hoặc null
    type: "authenticated";     // kiểu của người dùng, luôn là "authenticated"
  }
//   export interface ModalProps {
//     isOpen:boolean
//     onClose: () => void;
//     className: string;
//     title: string;
//     description: string;
//     buttonText: string;
//     handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
//     children?: React.ReactNode;
//   }
  