import React, { useEffect, useRef, useState } from "react"
import "./MovieRow.css"
import Cards from "./Cards"

const MovieRow = ({ title, fetchUrl }) => {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [scrollX, setScrollX] = useState(0)
    const containerRef = useRef(null)

    const loadMovies = async () => {
        setLoading(true)
        try {
            const pagedUrl = `${fetchUrl}&page=${page}`
            const res = await fetch(pagedUrl)
            const data = await res.json()
            setMovies(prev => [...prev, ...data.results])
        } catch (err) {
            console.error("Failed to load movies:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadMovies()
    }, [page])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleScroll = () => {
            setScrollX(container.scrollLeft)

            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 50 && !loading) {
                setPage(prev => prev + 1)
            }
        }

        const handleWheel = (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault()
                container.scrollLeft += e.deltaY
            }
        }

        container.addEventListener("scroll", handleScroll)
        container.addEventListener("wheel", handleWheel, { passive: false })

        return () => {
            container.removeEventListener("scroll", handleScroll)
            container.removeEventListener("wheel", handleWheel)
        }
    }, [loading])

    const scroll = (direction) => {
        const container = containerRef.current
        if (!container) return

        const scrollAmount = container.clientWidth * 0.8
        if (direction === "left") {
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
        } else {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" })
        }
    }

    return (
        <div className="movieRow">
            <h2 className="movieRow__title">{title}</h2>
            <div className="movieRow__wrapper">
                {scrollX > 0 && <button className="scrollBtn left" onClick={() => scroll("left")}>&#8249;</button>}
                <div className="movieRow__slider" ref={containerRef}>
                    {movies.map(movie => (
                        <Cards key={movie.id} movie={movie} />
                    ))}
                    {loading && <div className="loader">Loading...</div>}
                </div>
                <button className="scrollBtn right" onClick={() => scroll("right")}>&#8250;</button>
            </div>
        </div>
    )
}

export default MovieRow
