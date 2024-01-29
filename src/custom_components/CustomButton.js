

const CustomButton = (props) => {
    const {text, onClick, outline = false} = props;

    return (
        <Button variant="contained" size="large" sx={outline ? }>
            {text}
        </Button>
    )
}

export default CustomButton;