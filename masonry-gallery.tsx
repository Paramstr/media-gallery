"use client"

import { useState, useEffect } from "react"
import { Heart, Plus, MoreHorizontal } from "lucide-react"

// Full list of image URLs
const allImageUrls = [
  "https://i.pinimg.com/originals/f0/35/ed/f035ed13bddba85904a4f0c5401bdb75.jpg",
  "https://i.pinimg.com/originals/ac/6b/af/ac6baf2ba7606d8246148d2f88f6d7ed.jpg",
  "https://i.pinimg.com/originals/f8/7a/70/f87a70f1e578d67304c11b58a0d630da.jpg",
  "https://i.pinimg.com/originals/bd/e2/56/bde256ecd9cf48b999017705e631211d.jpg",
  "https://i.pinimg.com/originals/91/2e/e5/912ee551b98ab12183c7516223496f94.jpg",
  "https://i.pinimg.com/originals/db/ab/f9/dbabf9045459ebd21d9d7224fc7fc77f.jpg",
  "https://i.pinimg.com/originals/fb/93/7b/fb937b6d083aa449caf6ce3ea0520aa3.jpg",
  "https://i.pinimg.com/originals/86/88/93/8688936d1352fbc9a27c4524e67bf590.jpg",
  "https://i.pinimg.com/originals/86/8c/c6/868cc6864c28a60245ab662ec8270c81.jpg",
  "https://i.pinimg.com/originals/42/65/e7/4265e7121434c33e8fc64bacda294d16.jpg",
  "https://i.pinimg.com/originals/41/39/6b/41396b1d0955737a797221d1dec82b5e.jpg",
  "https://i.pinimg.com/originals/ac/d4/39/acd4393ebf48e3be7e993531dda64d0c.jpg",
  "https://i.pinimg.com/originals/2e/20/61/2e20615cf353065bae5e727771fb36c0.jpg",
  "https://i.pinimg.com/originals/42/dd/1e/42dd1ee92807f94aa713c57807e4de5f.png",
  "https://i.pinimg.com/originals/b7/e3/91/b7e391037a3ea8f753c2ba62fe7ac8da.jpg",
  "https://i.pinimg.com/originals/80/5d/ad/805dadfdd6183959b856299aad1a392b.jpg",
  "https://i.pinimg.com/originals/89/e2/fd/89e2fd976f32ee06d9ab7c30353fe2ac.jpg",
  "https://i.pinimg.com/originals/6f/2a/08/6f2a08b5f60a4030a75c35994735e404.jpg",
  "https://i.pinimg.com/originals/25/2b/dd/252bddd62534746ecfb01afb0924bdc6.png",
  "https://i.pinimg.com/originals/cc/71/37/cc713727af785c581db04fd038e02d62.jpg",
  "https://i.pinimg.com/originals/54/fd/4b/54fd4b6d1fa402c87a6059b5a85b5d3e.jpg",
  "https://i.pinimg.com/originals/fd/d6/40/fdd640c596b59c3d225bed685f7a9ed2.jpg",
  "https://i.pinimg.com/originals/1a/0e/8d/1a0e8d4ac6bc56dbde73d873edf0db1b.jpg",
  "https://i.pinimg.com/originals/3b/95/74/3b95741fdfe8e2b84648954f84cc80a9.jpg",
  "https://i.pinimg.com/originals/7d/3d/60/7d3d60369c83246500c8de2d5a9996a1.jpg",
  "https://i.pinimg.com/originals/a4/3d/6c/a43d6c04ea9b09ccab23641c49dc573b.jpg",
  "https://i.pinimg.com/originals/13/02/02/1302027702131f488d5d64efdb502848.jpg",
  "https://i.pinimg.com/originals/31/b6/0a/31b60a346e41115055e94923e0b09d3f.jpg",
  "https://i.pinimg.com/originals/c7/00/bd/c700bda42d69488020ce2c9c9f555bd3.jpg",
  "https://i.pinimg.com/originals/a6/28/97/a6289792b7ad84c87498a0ed77aa8838.jpg",
  "https://i.pinimg.com/originals/c6/9e/7d/c69e7de7c3162f1f08bcfc39f6ee835a.jpg",
  "https://i.pinimg.com/originals/06/63/9c/06639cf34eee7ead74b2fa39841ad3b4.png",
  "https://i.pinimg.com/originals/6c/d2/b6/6cd2b64fc63216a292d6b3ad3bc522d7.jpg",
  "https://i.pinimg.com/originals/8a/e2/4a/8ae24a2540a8d796fb3389457ecc3eab.jpg",
  "https://i.pinimg.com/originals/12/c5/fb/12c5fbf2c3bb5c634d50451c9283baf3.jpg",
  "https://i.pinimg.com/originals/70/6d/2e/706d2e08b64c20a008276161bdc23316.png",
  "https://i.pinimg.com/originals/be/74/2d/be742d7eacb7e10a31a91a5dc7411e6b.png",
  "https://i.pinimg.com/originals/e1/5e/41/e15e4125b9bac801ebc845db2fb8632c.jpg",
  "https://i.pinimg.com/originals/46/a6/fb/46a6fbced0abdbab303295de686f5a61.jpg",
  "https://i.pinimg.com/originals/8d/0e/27/8d0e27755577015a873af107a6f95868.png",
  "https://i.pinimg.com/originals/5e/a3/40/5ea3401a2584598b4d7a7dc103ed2761.jpg",
  "https://i.pinimg.com/originals/3b/82/f7/3b82f78c7cfb2c273af56e5680e2ae25.jpg",
  "https://i.pinimg.com/originals/fe/31/7e/fe317e85bbf0f15678e933a4bbdd9a2f.jpg",
  "https://i.pinimg.com/originals/4b/5a/18/4b5a18d1193cb0e71e15191e18950915.jpg",
  "https://i.pinimg.com/originals/8b/e7/76/8be776680d9c1098c66bb0f071f2b94a.jpg",
  "https://i.pinimg.com/originals/a6/d0/4c/a6d04cb5a045186f6e19f8d51c90b050.jpg",
  "https://i.pinimg.com/originals/19/f3/9b/19f39b0e34184235b639bb9037b72ca4.jpg",
  "https://i.pinimg.com/originals/4e/f9/52/4ef952e7879bea18081a4fd1fd7e0734.png",
  "https://i.pinimg.com/originals/1c/2a/b1/1c2ab1c6c717c72b29b55f90008ef66d.png",
  "https://i.pinimg.com/originals/43/1b/54/431b547de2d241d24fb23b57ee0a6554.jpg",
  "https://i.pinimg.com/originals/28/23/2b/28232b9d68a3fdf0a3c0a301a402b051.jpg",
  "https://i.pinimg.com/originals/9d/85/f9/9d85f9e89c3ac393a9317246245a2bde.jpg",
  "https://i.pinimg.com/originals/56/17/00/561700d5ed137a626769a1e1d9827cc7.png",
  "https://i.pinimg.com/originals/7e/23/a7/7e23a79a8cfe306639942770abaf36ac.jpg",
  "https://i.pinimg.com/originals/67/06/0a/67060a7daa244002c7db3bdc2e871826.jpg",
  "https://i.pinimg.com/originals/b4/f9/6b/b4f96b16bb21497283b464720cbe3cf1.png",
  "https://i.pinimg.com/originals/05/0c/91/050c91444e9939c00c22ab7774f1a047.jpg",
  "https://i.pinimg.com/originals/6d/45/0d/6d450d8a804447c29ad23618cd458a0b.png",
  "https://i.pinimg.com/originals/06/31/d9/0631d9bb70c5b49d067ec4c68f15a5db.jpg",
  "https://i.pinimg.com/originals/d0/1f/ad/d01fad0cde04b9f8a7f965c3c0c58c1f.jpg",
  "https://i.pinimg.com/originals/f4/53/a0/f453a0b54fd43478e88499fcdcc3d2ae.jpg",
  "https://i.pinimg.com/originals/ff/28/26/ff282610fd4b3a0f097f5ed00065ef62.jpg",
  "https://i.pinimg.com/originals/e5/6f/99/e56f997b6e235950843e72250d1445b1.jpg",
  "https://i.pinimg.com/originals/8b/9c/16/8b9c1680eeb3fb216bf103840c9ac740.jpg",
  "https://i.pinimg.com/originals/d6/56/4c/d6564c95acbdabef6aef51b01464e187.jpg",
  "https://i.pinimg.com/originals/eb/a4/92/eba49207f6049baa0ba09b10a228c35c.jpg",
  "https://i.pinimg.com/originals/37/38/43/373843869ff4814b80d12333cd2a0186.png",
  "https://i.pinimg.com/originals/1c/78/2c/1c782ca73589f8f9de87e73f04de2763.jpg",
  "https://i.pinimg.com/originals/a9/f5/be/a9f5beb78fedb30f9f28bba607f553c4.jpg",
]

export default function MasonryGallery() {
  const [visibleImages, setVisibleImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // Load images in batches for better performance
  useEffect(() => {
    // Initial batch of images
    setVisibleImages(allImageUrls.slice(0, 20))
    setLoading(false)

    // Load more images as user scrolls
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        if (visibleImages.length < allImageUrls.length) {
          setVisibleImages(allImageUrls.slice(0, visibleImages.length + 10))
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [visibleImages])

  return (
    <div className="w-full bg-black min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 p-4 space-y-4">
          {visibleImages.map((url, index) => (
            <div key={index} className="break-inside-avoid mb-4 rounded-lg overflow-hidden">
              <div className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <button className="rounded-full bg-black/50 text-white hover:bg-black/70 p-2">
                      <Heart className="h-5 w-5" />
                    </button>
                    <button className="rounded-full bg-black/50 text-white hover:bg-black/70 p-2">
                      <Plus className="h-5 w-5" />
                    </button>
                    <button className="rounded-full bg-black/50 text-white hover:bg-black/70 p-2">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

