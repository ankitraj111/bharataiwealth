import os
import time
from huggingface_hub import HfApi
from requests.exceptions import ConnectionError

def upload_to_hf():
    # Configuration - Change these values
    repo_id = "Ankit0101111/bharat-ai-ml-service"  # Format: "username/space-name"
    
    # Try to get token from environment or ask
    token = os.getenv("HF_TOKEN")
    
    if not token:
        print("Error: HF_TOKEN not found in environment variables.")
        print("Please set it using: set HF_TOKEN=your_token_here (on Windows)")
        print("Or pass it to this script.")
        token = input("Enter your Hugging Face Write Token: ")

    api = HfApi()
    
    max_retries = 3
    retry_delay = 5  # seconds
    
    for attempt in range(1, max_retries + 1):
        print(f"\nAttempt {attempt} of {max_retries}: Uploading files to Space {repo_id}...")
        
        try:
            # Create repo if it doesn't exist
            api.create_repo(
                repo_id=repo_id,
                repo_type="space",
                space_sdk="docker",
                exist_ok=True,
                token=token
            )
            
            # Upload all files in the current directory (ml-service)
            # Excluding .venv, __pycache__, etc.
            api.upload_folder(
                folder_path=".",
                repo_id=repo_id,
                repo_type="space",
                token=token,
                ignore_patterns=[
                    ".venv/*",
                    "__pycache__/*",
                    "*.pyc",
                    ".env",
                    ".dockerignore",
                    "README.md",
                    "hf_upload.py",
                    "integration_test.py",
                    "test_*.py",
                    # Exclude deprecated files
                    "*_DEPRECATED.py",
                ]
            )
            
            # Explicitly upload README.md with HF metadata
            api.upload_file(
                path_or_fileobj="README.md",
                path_in_repo="README.md",
                repo_id=repo_id,
                repo_type="space",
                token=token
            )
            
            print(f"\n[SUCCESS] Upload successful! View your Space at: https://huggingface.co/spaces/{repo_id}")
            return  # Exit if successful
            
        except (ConnectionError, Exception) as e:
            print(f"\n[ERROR] Attempt {attempt} failed: {str(e)}")
            if attempt < max_retries:
                print(f"Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
            else:
                print("\n[FAILURE] All attempts failed. Please check your internet connection or Hugging Face status.")

if __name__ == "__main__":
    upload_to_hf()
