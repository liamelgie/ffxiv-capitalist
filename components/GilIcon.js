import Image from 'next/image'

const GilIcon = ({ height, width }) => {
    return <div className="gilIcon"><Image alt="" height={height || 20} width={width || 20} src='/gil.png' /></div>
}

export default GilIcon