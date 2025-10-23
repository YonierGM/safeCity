export function Aside({ title, description, phrase, urlImage }) {
    return (
        <div
            className={`relative flex flex-col justify-center gap-3 h-dvh md:rounded-tr-2xl md:rounded-br-2xl p-6 md:p-12 lg:px-16 bg-cover bg-center`}
            style={{ backgroundImage: `url(${urlImage})` }}
        >
            {/* Capa de opacidad */}
            <div className="absolute inset-0 bg-black opacity-30 rounded-tr-2xl rounded-br-2xl"></div>

            {/* Contenido encima */}
            <div className="relative z-10 text-white h-dvh flex flex-col items-center justify-end">
                <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-3xl lg:text-4xl text-center">
                    {title}
                </h1>
                <p className="mb-6 text-base font-normal text-gray-200 text-center">
                    {description}
                </p>
                <p className="font-bold text-base text-gray-100">
                    {phrase}
                </p>
            </div>
        </div>
    );
}