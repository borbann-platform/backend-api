from app.core.db import Base

# Import all models here to ensure they are registered with Base
from .pipeline import Pipeline, DataSource, PipelineRun, PipelineRunResult
from .news_article import NewsArticle

# You can optionally define __all__ if needed
# __all__ = ["Base", "Pipeline", "DataSource", "NewsArticle", "PipelineRun", "PipelineRunResult"]
