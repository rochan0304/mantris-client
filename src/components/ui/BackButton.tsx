import type React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
    path?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ path }) => {
    const navigate = useNavigate();

    return (
        <span onClick={() => path ? navigate(path) : navigate(-1) } style={{padding: '20px 30px 20px 0', fontSize: '20px', display: 'flex'}}>
            <FaArrowLeft />
        </span>
    );
}

export default BackButton;