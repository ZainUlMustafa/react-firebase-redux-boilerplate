import { Chip } from "@mui/material";
import SmartUtils from "../../helpers/SmartUtils";
import { useEffect } from "react";
import { useState } from "react";

const ControlChip = ({ text = "", size = 12, weight = 'normal', hasBorder = false, marginInline = 0, marginBlock = 0, fontSize = 12, showControlCommand = true }) => {
    const su = new SmartUtils()
    const [os, setOs] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const data = await su._checkOS(navigator);
            setOs(data);
        }

        fetchData()
    }, [])

    const { platform = "" } = os;
    const ctrlSymbol = platform === "macOS" ? "⌘" : "Ctrl+"

    return (
        <Chip
            size="small"
            variant="outlined"
            label={`${showControlCommand ? ctrlSymbol : ''}${text}`}
            sx={{ fontSize: fontSize, borderRadius: '7px', margin: '0px', height: Number((size * 2) / 10).toFixed(0) * 10 + 4, padding: '3px', fontWeight: weight, marginInline: marginInline, marginBlock: marginBlock, color: 'grey' }}
        />
    );
}

export default ControlChip;