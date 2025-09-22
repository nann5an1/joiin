'use client';
import { useSearchParams } from "next/navigation";

export default function ShowURLimg() {
   
    const param = useSearchParams().get("urlQR") || "";
    const manual = useSearchParams().get("manual") || "";
    console.log("url param: ", param);
    console.log("manual param: ", manual);
    return (
        <div>
            <h1>QR Code</h1>
            <img src={param} alt="" />
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAYAAAAZtYVBAAAAAklEQVR4AewaftIAAAYkSURBVO3BQQ4cO3TAQFKY 1 Z8VJZRECjZ/zl4FXZH4xxicUYF1mMcZHFGBdZjHGRxRgXWYxxkcUYF1mMcZHFGBdZjHGRxRgXWYxxkcUYF1mMcZHFGBf58JLK31SxU9lV7FROKk5UdhVPqJxU7FR2FW o/E0VbyzGuMhijIssxrjIhy r CaVk4pvUnlD5aTiv1TxTSrftBjjIosxLrIY4yIffkzliYonVN5Q2VXsVE5UdhU7lZ3KrmJXsVM5qXhD5YmKX1qMcZHFGBdZjHGRD/ 4ip3KScUvqZxU7FSeqNip7Cr ZYsxLrIY4yKLMS7yYfwvKicqJxU7lZ3K L8txrjIYoyLLMa4yIcfq/gllSdUdhW7ip3KrmKnslPZVexUTir poqbLMa4yGKMiyzGuMiHL1P5L1XsVHYVO5VdxRsVO5VdxU7lRGVX8YbKzRZjXGQxxkUWY1zkw0sV/6WKNyreqHij4qTijYp/yWKMiyzGuMhijIvYH7ygsqvYqewqnlA5qThROal4QmVX8Usqu4o3VHYVJyq7ip3KruKNxRgXWYxxkcUYF/nwUsVO5QmVk4qdyhsVT6icqJxU7FSeqNipvFFxorKrOKn4psUYF1mMcZHFGBf58JLKScVJxU5lp7Kr2KnsKp5QeaNip7JTOal4o IJlSdUnqh4YzHGRRZjXGQxxkU vFSxU3mj4kTlROWJihOVb6rYqZxUnKjsKnYqu4qdyknFTmVX8U2LMS6yGOMiizEuYn/wgsquYqeyq9ipvFFxorKr2Kl8U8VO5ZsqTlSeqHhC5aTijcUYF1mMcZHFGBf58FLFScVOZVexU9lV7FR2KruKE5VdxYnKrmKnclJxovKGyq5ip7KruNlijIssxrjIYoyLfPiPqewqdionFTuVJ1S SWVX8UTFicquYqeyqzhROanYVexUvmkxxkUWY1xkMcZFPvyYyhsVO5WTip3KScUTKicVO5Vdxa7iRGVXsVPZVexUdhUnFTuVv2kxxkUWY1xkMcZFPlxG5aTiRGVXsVM5UTmp2KmcVOxUnqh4QuVEZVexUzmp KXFGBdZjHGRxRgX fCSyq7ipGKnclKxUzmpOKl4omKncqLyTSpPVOxUnqh4QmVX8cZijIssxrjIYoyL2B98kcoTFScqT1ScqOwqTlROKnYqb1ScqJxUnKj8UsUbizEushjjIosxLvLhJZVdxYnKicqu4pdUTipOVHYVO5WTip3KScVOZafyRMVOZVexU9lVfNNijIssxrjIYoyLfHip4kTlRGVXsVP5mypOVHYVO5VdxU7lDZVdxU7lpOKNil9ajHGRxRgXWYxxkQ8/VvGEyq7iRGVXsVPZVTyhsqt4QuWJipuo7Cp2KruKNxZjXGQxxkUWY1zkw0sqT1Q8obKrOFHZVTyhcqKyq3iiYqeyq9ipPFFxorKr2FXsVP6mxRgXWYxxkcUYF/nwUsWJyk5lV3FSsVN5Q2VXcVLxRMVOZafyTRU7lZOKncpJxUnFNy3GuMhijIssxriI/cELKicVJyq7ip3KruINlV q2KnsKr5J5ZsqTlROKt5YjHGRxRgXWYxxEfuDf5jKScWJyknFTuVvqtipnFQ8obKrOFE5qXhjMcZFFmNcZDHGRT68pPI3VTyhsqvYVexUdionFTuVJypOVHYVO5UTlV3FEyp/02KMiyzGuMhijIt8 LKKb1I5qXhD5aRip3JScaLyRMVO5YmKJ1R2FX/TYoyLLMa4yGKMi3z4MZUnKr5J5YmKncqJyi pPKHyRsUTKruKNxZjXGQxxkUWY1zkw/8zKruKE5UnKnYqJxU7lZ3KrmJXsVM5qThReUJlV/FLizEushjjIosxLvLhH6fySxVPVJxU7FR2KruKXcWJyq5iV7FT2amcqPzSYoyLLMa4yGKMi3z4sYpfqnhCZVdxovKGyq7ipGKn8k0qu4qbLMa4yGKMiyzGuMiHL1P5m1ROKr6p4omKncoTFTuVNyp2Kk9U7FR2FW8sxrjIYoyLLMa4iP3BGJdYjHGRxRgXWYxxkcUYF1mMcZHFGBdZjHGRxRgXWYxxkcUYF1mMcZHFGBdZjHGRxRgXWYxxkf8BiLLqf6s4UEsAAAAASUVORK5CYII=?manual=ENLFEODJGZHW2RKYGUSGEJBEHFRGKYTI" alt="" />
            <h1>Manual Entry Key</h1>
            <p>{manual}</p>
        </div>
    );
}