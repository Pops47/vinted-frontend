import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Publish.scss";

function Publish({ token }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [exchanges, setExchanges] = useState(false);
  const [picture, setPicture] = useState({});

  const [displayImage, setDisplayImage] = useState(null);

  const navigate = useNavigate();

  return (
    <div>
      {token ? (
        <div className="publish-body">
          <form
            className="publish-form"
            onSubmit={async (e) => {
              e.preventDefault();

              const formData = new FormData();
              formData.append("picture", picture);
              formData.append("title", title);
              formData.append("description", description);
              formData.append("brand", brand);
              formData.append("size", size);
              formData.append("color", color);
              formData.append("condition", condition);
              formData.append("city", city);
              formData.append("price", price);
              formData.append("exchanges", exchanges);

              try {
                const response = await axios.post(
                  "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );
                navigate(`/offer/${response.data._id}`);
              } catch (error) {
                console.log(error.message);
              }
            }}
          >
            <p>Vends ton article</p>
            <section className="add-photo">
              <div className="add-photo-int">
                {displayImage === null ? (
                  <div>
                    <input
                      className="add-photo-input"
                      id="add-photo"
                      type="file"
                      onChange={(e) => {
                        setPicture(e.target.files[0]);
                        setDisplayImage(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                    <label for="add-photo" className="add-photo-label">
                      <span>+ </span> Ajoute une photo
                    </label>
                  </div>
                ) : (
                  <div>
                    <img src={displayImage} alt="" />
                    <button onClick={() => setDisplayImage(null)}>
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            </section>
            <section>
              <div>
                <p>Titre</p>
                <input
                  type="text"
                  name="title"
                  placeholder="ex: Pull gris Nike"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  placeholder="ex: très confortable"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </section>
            <section>
              <div>
                <p>Marque</p>
                <input
                  type="text"
                  name="brand"
                  placeholder="ex: Nike"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div>
                <p>Taille</p>
                <input
                  type="text"
                  name="size"
                  placeholder="ex: XL"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
              <div>
                <p>Couleur</p>
                <input
                  type="text"
                  name="color"
                  placeholder="ex: gris"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div>
                <p>Etat</p>
                <input
                  type="text"
                  name="condition"
                  placeholder="ex: Bon état"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                />
              </div>

              <div>
                <p>Ville</p>
                <input
                  type="text"
                  name="city"
                  placeholder="ex: Paris"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </section>
            <section>
              <div>
                <p>Prix</p>
                <input
                  type="text"
                  name="price"
                  placeholder="0.00 €"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="exchange-line">
                <div>
                  <input
                    type="checkbox"
                    name="checkbox"
                    value={exchanges}
                    onChange={(e) => setExchanges(e.target.checked)}
                  />{" "}
                  <p>Je suis interressé(e) par les échanges</p>
                </div>
              </div>
            </section>

            <div className="submit-container">
              <input
                className="payment-green-button"
                type="submit"
                value="Ajouter"
              />
            </div>
          </form>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}

export default Publish;
