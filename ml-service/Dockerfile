# Use Python 3.11 slim image for smaller size
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# =============================================
# Force CPU-only TF/PyTorch at the OS level
# =============================================
ENV CUDA_VISIBLE_DEVICES="-1"
ENV TF_CPP_MIN_LOG_LEVEL="3"
ENV TF_FORCE_GPU_ALLOW_GROWTH="false"
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies required for some Python packages
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
# Use --extra-index-url for CPU-only PyTorch to avoid 2GB+ CUDA build
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir \
        --extra-index-url https://download.pytorch.org/whl/cpu \
        -r requirements.txt

# Copy application code
COPY . .

# Create models directory if it doesn't exist
RUN mkdir -p models data/clean data/clean_crypto data/mf

# Expose port (Hugging Face Spaces requires 7860)
EXPOSE 7860

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:7860/health || exit 1

# Run the application with uvicorn (single worker for memory efficiency)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860", "--workers", "1", "--timeout-keep-alive", "60"]
