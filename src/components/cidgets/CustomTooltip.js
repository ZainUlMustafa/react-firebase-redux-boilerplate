import { Tooltip, styled, tooltipClasses } from "@mui/material";

const CustomTooltip = ({widget=<></>, placement="bottom", arrow=true, title=<></>}) => {
    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f1f1',
            color: 'rgba(0, 0, 0, 1)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid grey',
            borderRadius: '10px',
            padding: '8px',
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
        },
    }));
    return <HtmlTooltip placement={placement} arrow={arrow} title={title}>
        {widget}
    </HtmlTooltip>
}

export default CustomTooltip;