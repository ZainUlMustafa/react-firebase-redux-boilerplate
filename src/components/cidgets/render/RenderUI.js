import { Typography } from "@mui/material";

/**
    * Produces a UI.
*/
const RenderUI = ({ data = [], titleStyle = { fontSize: '18px', fontWeight: 'bold' }, paraStyle = { fontSize: '16px', fontWeight: 'normal' } }) => {
    return (
        <>
            {data.sort((a, b) => a.order - b.order).map((e) => {
                const { title, order, para = "", points, showOrder=false } = e
                return (
                    <div key={order}>
                        {title.length === 0 ? <></> : <Typography variant="h3" sx={{ ...titleStyle }}>{showOrder?`${order}. `:''}{title}</Typography>}
                        {para.length === 0 ? <></> : <Typography variant="p" sx={{ ...paraStyle }}>{para}</Typography>}
                        {points?.numeric ? <ol>{points?.data?.map((eachPoint, i) => {
                            return <li key={i}>{eachPoint}</li>
                        })}</ol> : <ul>
                            {points?.data?.map((eachPoint, i) => {
                                console.log(showOrder)
                                return <li key={i}><Typography variant="p" sx={{ ...paraStyle }}>{eachPoint}</Typography></li>
                            })}
                        </ul>}
                    </div>
                )
            })}
        </>
    );
}

export default RenderUI;