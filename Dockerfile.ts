FROM docker.io/python:3.10

COPY dane_server /src/dane_server
COPY README.md /src
COPY pyproject.toml /src
COPY poetry.lock /src

# override this config in Kubernetes with a ConfigMap mounted as a volume to /root/.DANE
RUN mkdir /root/.DANE

WORKDIR /src

RUN pip install poetry
RUN poetry config virtualenvs.create false && poetry install --no-dev --no-interaction --no-ansi

CMD [ "python", "/src/dane_server/server.py"]