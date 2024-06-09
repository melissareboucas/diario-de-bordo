export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-4 border-blue-500 border-t-transparent border-t-4 border-solid rounded-full animate-spin"></div>
                <p className="text-lg">Loading...</p>
            </div>
        </div>
    )
}