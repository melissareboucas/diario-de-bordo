interface AddButtonProps {
    sendToLink: string;
    buttonText: string
}

export function AddButton({ sendToLink, buttonText }: AddButtonProps) {

    return (
        <a href={sendToLink}>
            <button className='mr-16 text-custom-dark-blue border border-md rounded-lg px-4 py-2 border-custom-medium-blue'>
                {buttonText}
            </button>
        </a>
    );
}