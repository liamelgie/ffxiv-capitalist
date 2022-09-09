import Image from 'next/image'

const HQIcon = ({ height, width, theme }) => {
    const path = theme === 'light' ? '/hq-black.png' : '/hq-white.png'
    return <div className="hqIcon"><Image alt="" height={height || 10} width={width || 10} src={path} /></div>
}

export default HQIcon